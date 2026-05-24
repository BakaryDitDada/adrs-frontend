import { Activity, Check } from 'lucide-react';
import * as S from './ProgressBar.styles';
import * as CS from '../common/DetailPage.styles';

const ProgressBar = ({data}) => {

  return (
    <CS.Card>
      <CS.CardHeader>
        <CS.CardTitleWrapper>
          <CS.CardIcon><Activity size={18} /></CS.CardIcon>
          <CS.CardTitle>Etat d&apos;avancement</CS.CardTitle>
        </CS.CardTitleWrapper>
        <CS.StepsCompleted>
          {data.filter((s) => s.status === 'completed').length} sur {data.length} étapes completées
        </CS.StepsCompleted>
      </CS.CardHeader>
      <S.ProgressWrapper>
        {data.map((step, index) => (
          <S.StepItem key={step.id}>
            {index !== data.length - 1 && (
              <S.StepLine $completed={step.status === 'Achevée'} />
            )}
            <S.StepCircle status={step.status}>
              {step.status === 'Achevée' ? <Check size={16} /> : step.id}
            </S.StepCircle>
            <S.StepContent>
              <S.StepLabel>{step.label}</S.StepLabel>
              <S.StepStatus status={step.status}>{step.status}</S.StepStatus>
            </S.StepContent>
          </S.StepItem>
        ))}
      </S.ProgressWrapper>
    </CS.Card>
    // <S.WorkflowContainer>
    // <Card>
    //   {data?.map((step, index) => {
    //     const isLast = index === data?.length - 1;

    //     return (
    //       <S.WorkflowStep
    //         key={step.id}
    //         $interactive
    //       >
    //         <S.WorkflowTrack>
    //           <S.WorkflowNode status={step.status}>
    //             {step.status === 'completed'
    //               ? <Check size={12} />
    //               : index + 1}
    //           </S.WorkflowNode>

    //           {!isLast && (
    //             <S.WorkflowLine
    //               $active={
    //                 step.status === 'completed'
    //               }
    //             />
    //           )}
    //         </S.WorkflowTrack>

    //         <S.WorkflowContent>
    //           <S.WorkflowLabel>
    //             {step.label}
    //           </S.WorkflowLabel>

    //           <S.WorkflowMeta>
    //             {step.description}
    //           </S.WorkflowMeta>
    //         </S.WorkflowContent>
    //       </S.WorkflowStep>
    //     );
    //   })}
    // </Card>
    // </S.WorkflowContainer>
  )
}

export default ProgressBar;