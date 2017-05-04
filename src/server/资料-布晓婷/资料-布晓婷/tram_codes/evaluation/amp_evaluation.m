function [ result ] = amp_evaluation(Pre_Labels,test_target)
%amp_evaluation Calculate the evaluation values under various criteria
% $ Arguments $
%   - Outputs:       The confidence output for testing samples: cnum x |U| matrix, each sample takes a column.
%   - Pre_Labels:    The label set predicted for testing samples: cnum x |U| matrix (+1/-1)
%   - test_target:   The ground truth label set for testing samples: cnum x |U| matrix (+1/-1)
%   
% $ Syntax $
%   - [ result ] = amp_evaluation( Outputs, Pre_Labels,test_target...)

% hamming loss
    result.HL=hamming_loss(Pre_Labels,test_target);
% accuracy
    result.AccAMP=accuracy_amp(Pre_Labels,test_target);
% Precision&Recall
    [result.Pre,result.Rec]=PreRec(Pre_Labels,test_target);
% absolute ture
    result.AbT=absolute_ture(Pre_Labels,test_target);

% result summary
%  result.text =[ ...
%          '  -HL:' num2str(result.HL)...
%         '  -AccAMP:' num2str(result.AccAMP)...
%         '  -Pre:' num2str(result.Pre)...
%         '  -Rec:' num2str(result.Rec)...
%         '  -AbT:' num2str(result.AbT)...
%         ];
%     disp(['amp_evaluation result:' result.text]);