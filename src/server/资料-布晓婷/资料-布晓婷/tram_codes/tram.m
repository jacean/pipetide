function [ Confidence,Pre_Labels] = tram( train_data,test_data,train_label, K)
% $ Arguments $
%   - train_data:  The training sample matrix: dim x |L| matrix (sparse matrix format is prefered)
%   - test_data:   The testing sample matrix: dim x |U| matrix (sparse matrix format is prefered)
%   - train_label: The label matrix for training samples: num_class x |L| matrix, (+1/-1), each sample takes a column.
%   - K: K sparse for the similarity matrix(K default=10)
%   - Pre_Labels: the predicted labels for testing samples
%   - Confidence: the coresponding confidence for testing samples

%MDDM dimensionality reduction
dr=mddm();
dr= dr.train(train_data,train_label);
train_data= dr.apply(train_data);
test_data= dr.apply(test_data);
%取test和train的总共样本数：n
[~,train_num]=size(train_data);
test_num=size(test_data,2);
n = train_num+test_num;
%% Calculate with kNN graph，生成的W为标准化之后的
    %需要改!要将标签信息也用于W的构建
    W = slaffinitymat([train_data test_data], [ ], {'ann', 'K', K},'excludeself',true,'sym',true, train_label, K);
    %W = slaffinitymat([train_data test_data], [ ], {'ann', 'K', K},'excludeself',true,'sym',true);
    %将W标准化（不用改）第一个参数是n行一列的矩阵，将其放置在n*n矩阵的对角线上
    W=spdiags(1./sum(W,2),0,n,n)*W;
%% Normalize labels: each column sum to 1（注意非抗菌肽，列和为0，train_label非抗菌肽列结果NaN,可能也不用改）
%生成的train_label是标准化之后的
    train_label(train_label>0)=1; train_label(train_label~=1)=0;
    numlab=sum(train_label,1);
    train_label=train_label*spdiags(1./sum(train_label,1)',0,train_num,train_num);
%%自己加的
for i=1:size(train_label,1);
  for j=1:size(train_label,2);
     if isnan(train_label(i,j));
        train_label(i,j)=0;
  	end;
  end;
end;
        
%为求confidence和card（即θ的矩阵，θ为某样本抗性个数）做准备
%speye(n)生成n阶单位阵
A = speye(n)-W; 
ANN = A(train_num+1:n,train_num+1:n);
ANL = A(train_num+1:n,1:train_num);
b=-ANL*train_label';
bt=-ANL*numlab';
%求confidence和card
% Confidence=((ANN.^-1)*b)';
% card=((ANN.^-1)*b)';
Confidence=lscov(ANN,b)';
card=lscov(ANN, bt)';
card=floor(card+0.5);

% [~,IX]=sort(Confidence,1,'descend');
% [~,IXX]=sort(Confidence(1:size(Confidence,1)-1,:),1,'descend');
% %将Pre_Labels初始化
% Pre_Labels=-ones(size(Confidence,1)-1,size(Confidence,2));
% for x=1:test_num;
%     while (IX(1,x)~=size(Confidence,1))&&(card(x)~=0);
%    Pre_Labels(IXX(1:card(x),x),x)=1;
%     end;
% end;


[~,IX]=sort(Confidence,1,'descend');
Pre_Labels=-ones(size(Confidence));
for x=1:test_num
   Pre_Labels(IX(1:card(x),x),x)=1;
end








