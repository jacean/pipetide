function [ result ] = qj_evaluation( Pre_Labels,test_target)
%qj_evaluation Calculate the evaluation values under various criteria
% $ Arguments $
%   - Outputs:       The confidence output for testing samples: cnum x |U| matrix, each sample takes a column.
%   - Pre_Labels:    The label set predicted for testing samples: cnum x |U| matrix (+1/-1)
%   - test_target:   The ground truth label set for testing samples: cnum x |U| matrix (+1/-1)
%   
% $ Syntax $
%   - [ result ] = qj( Outputs, Pre_Labels,test_target...)

% qj_evaluation
    [result.Sn,result.Sp,result.Acc,result.MCC]=qj(Pre_Labels,test_target);
% result summary
 result.text =[ ...
        '  -Sn:' num2str(result.Sn)...
        '  -Sp:' num2str(result.Sp)...
        '  -Acc:' num2str(result.Acc)...
        '  -MCC:' num2str(result.MCC)...
        ];
    disp(['qj_evaluation result:' result.text]);
