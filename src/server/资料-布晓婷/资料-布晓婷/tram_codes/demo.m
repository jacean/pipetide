% This is a demo SCRIPT for TRAM running on AMP data set.
% To run this demo, please first move "s1s2.mat" or "s1s3.mat" to directory path
install_paths;
clear; clc;
%load s1s2.mat;
load s1s2.mat

%Pre_Labels is the prediction result, default K is 3
 [ Confidence, Pre_Labels] = tram(train_data,test_data,train_label,3);
 %last two is the evaluation code
 %[ result ] = amp_evaluation(Pre_Labels(:,1:907),test_label(:,1:907));
%A = qj_evaluation(Pre_Labels,test_label);

