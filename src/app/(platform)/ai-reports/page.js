'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Sparkles, Send, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { selectCurrentToken } from '@/store/features/auth/authSlice';
import { useGetReportsQuery } from '@/store/features/ai/AiApi';
import * as S from './AIReports.styles';
import { formatDate, truncateStr } from '@/utils';

// Validation schema
const reportSchema = z.object({
  query: z.string().min(5, 'Query must be at least 5 characters').max(1000, 'Query too long'),
});

export default function AIReportsPage() {
  const token = useSelector(selectCurrentToken);
  const [report, setReport] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const [isStreaming, setIsStreaming] = useState(false);
  const [streamStatus, setStreamStatus] = useState('');
  const [generationCompleted, setGenerationCompleted] = useState(false);

  const { data: res, isLoading, isError, isSuccess } = useGetReportsQuery();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: { query: '' },
  });

  const streamReportGeneration = async (query) => {

    setReport('');
    setError('');
    setGenerationCompleted(false);
    setIsStreaming(true);

    try {

      const response = await fetch(
        `http://localhost:5000/api/v1/ai/reports/stream`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${ token }`,
          },

          body: JSON.stringify({
            query,
          }),
        }
      );

      if (!response.body) {
        throw new Error(
          'Streaming non supporté'
        );
      }

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let buffer = '';

      while (true) {

        const {
          done,
          value,
        } =
          await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(
          value,
          {
            stream: true,
          }
        );

        const events =
          buffer.split('\n\n');

        buffer =
          events.pop() ?? '';

        for (
          const eventText
          of events
        ) {

          const line =
            eventText
              .split('\n')
              .find(
                l =>
                  l.startsWith(
                    'data:'
                  )
              );

          if (!line)
            continue;

          try {

            const data =
              JSON.parse(
                line.replace(
                  'data:',
                  ''
                )
              );

            switch (
              data.type
            ) {

              case 'thinking':

                setStreamStatus(
                  data.message
                );

                break;

              case 'token':

                setReport(
                  prev =>
                    prev +
                    data.content
                );

                break;

              case 'done':

                setGenerationCompleted(
                  true
                );

                setStreamStatus(
                  ''
                );

                break;

              case 'error':

                setError(
                  data.message
                );

                break;
            }

          } catch (
            error
          ) {

            console.error(
              error
            );
          }
        }
      }

    } catch (error) {

      console.error(error);

      setError(
        'Erreur lors de la génération du rapport'
      );

    } finally {

      setIsStreaming(false);
    }
  };

  const onSubmit = async (data) => {

    await streamReportGeneration(
      data.query
    );

    reset();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <S.Container>
      <S.Header>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <S.Title>
            <Sparkles size={28} /> Générateur de Rapports IA
          </S.Title>
          <S.Description>
            Posez n’importe quelle question sur votre organisation et recevez instantanément un rapport détaillé et formaté.
          </S.Description>
        </motion.div>
      </S.Header>

      <S.FormCard
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.InputGroup>
            <S.QueryInput
              placeholder="e.g., Show me a summary of payroll for the last quarter, with department breakdown..."
              {...register('query')}
              $isError={!!errors.query ? "true" : "false"}
              rows={3}
            />
            {errors.query && <S.ErrorMessage>{errors.query.message}</S.ErrorMessage>}
          </S.InputGroup>
          <S.SubmitButton type="submit" disabled={isStreaming}>
            {isStreaming ? (
              <S.TypingDots>
                <span>.</span><span>.</span><span>.</span>
              </S.TypingDots>
            ) : (
              <>
                <Send size={18} /> Générer le rapport
              </>
            )}
          </S.SubmitButton>
        </form>

      </S.FormCard>

      {/* Error */}
      {error && (
        <S.ErrorCard
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <AlertCircle size={18} />
          <span>{error}</span>
        </S.ErrorCard>
      )}

      {/* Report */}
      <AnimatePresence>
        {isSuccess && (
          <S.ReportsList>
            {res?.reports?.slice(0, 4)?.map((report) => (
              <p key={report._id} onClick={() => setReport(report.content)}>
                <span>{truncateStr(report.content, 120)}</span>
                <span>{formatDate(report.createdAt)}</span>
              </p>
            ))}
          </S.ReportsList>
        )}
        {(report || isStreaming) && (
          <S.ReportCard
            as={motion.div}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            key="report"
          >
            <S.ReportHeader>
              {/* <h3>Generated Report</h3> */}
              <h3>
                 {generationCompleted
                  ? 'Rapport généré'
                  : 'Génération en cours...'}
              </h3>
              <S.CopyButton onClick={handleCopy} title="Copy report">
                {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy'}
              </S.CopyButton>
            </S.ReportHeader>
              
            <S.ReportContent>
              {isStreaming && (
                <S.StatusCard>

                  <S.TypingDots>
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </S.TypingDots>

                  <span>
                    {streamStatus}
                  </span>

                </S.StatusCard>
              )}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  // Additional custom components can be added (tables, links etc.)
                }}
              >
                {report}
              </ReactMarkdown>
            </S.ReportContent>
          </S.ReportCard>
        )}
      </AnimatePresence>
    </S.Container>
  );
}