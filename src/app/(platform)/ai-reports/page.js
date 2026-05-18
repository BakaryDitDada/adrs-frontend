'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Sparkles, Send, Copy, CheckCircle, AlertCircle } from 'lucide-react';
import { useGenerateReportMutation } from '@/store/features/ai/AiApi';
import * as S from './AIReports.styles';
import { normalizeMarkdown } from '@/utils';

// Validation schema
const reportSchema = z.object({
  query: z.string().min(5, 'Query must be at least 5 characters').max(1000, 'Query too long'),
});

export default function AIReportsPage() {
  const [generateReport, { isLoading }] = useGenerateReportMutation();
  const [report, setReport] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reportSchema),
    defaultValues: { query: '' },
  });

  const onSubmit = async (data) => {
    setError('');
    try {
      const response = await generateReport(data.query).unwrap();
      setReport(normalizeMarkdown(response?.manualReport));
      reset(); // clear input
    } catch (err) {
      console.error('AI report generation failed:', err);
      setError('Failed to generate report. Please try again.');
    }
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
          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
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
        {report && (
          <S.ReportCard
            as={motion.div}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            key="report"
          >
            <S.ReportHeader>
              <h3>Generated Report</h3>
              <S.CopyButton onClick={handleCopy} title="Copy report">
                {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy'}
              </S.CopyButton>
            </S.ReportHeader>
            <S.ReportContent>
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