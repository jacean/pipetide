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
%ȡtest��train���ܹ���������n
[~,train_num]=size(train_data);
test_num=size(test_data,2);
n = train_num+test_num;
%% Calculate with kNN graph�����ɵ�WΪ��׼��֮���
    %��Ҫ��!Ҫ����ǩ��ϢҲ����W�Ĺ���
    W = slaffinitymat([train_data test_data], [ ], {'ann', 'K', K},'excludeself',true,'sym',true, train_label, K);
    %W = slaffinitymat([train_data test_data], [ ], {'ann', 'K', K},'excludeself',true,'sym',true);
    %��W��׼�������øģ���һ��������n��һ�еľ��󣬽��������n*n����ĶԽ�����
    W=spdiags(1./sum(W,2),0,n,n)*W;
%% Normalize labels: each column sum to 1��ע��ǿ����ģ��к�Ϊ0��train_label�ǿ������н��NaN,����Ҳ���øģ�
%���ɵ�train_label�Ǳ�׼��֮���
    train_label(train_label>0)=1; train_label(train_label~=1)=0;
    numlab=sum(train_label,1);
    train_label=train_label*spdiags(1./sum(train_label,1)',0,train_num,train_num);
%%�Լ��ӵ�
for i=1:size(train_label,1);
  for j=1:size(train_label,2);
     if isnan(train_label(i,j));
        train_label(i,j)=0;
  	end;
  end;
end;
        
%Ϊ��confidence��card�����ȵľ��󣬦�Ϊĳ�������Ը�������׼��
%speye(n)����n�׵�λ��
A = speye(n)-W; 
ANN = A(train_num+1:n,train_num+1:n);
ANL = A(train_num+1:n,1:train_num);
b=-ANL*train_label';
bt=-ANL*numlab';
%��confidence��card
% Confidence=((ANN.^-1)*b)';
% card=((ANN.^-1)*b)';
Confidence=lscov(ANN,b)';
card=lscov(ANN, bt)';
card=floor(card+0.5);

% [~,IX]=sort(Confidence,1,'descend');
% [~,IXX]=sort(Confidence(1:size(Confidence,1)-1,:),1,'descend');
% %��Pre_Labels��ʼ��
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








