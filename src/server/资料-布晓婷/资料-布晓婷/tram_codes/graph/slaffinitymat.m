function A = slaffinitymat(X, X2, nnparams, varargin)
%SLAFFINITYMAT Constructs an affinity matrix(����һ����������)
%    W = slaffinitymat([train_data test_data], [ ], {'ann', 'K', K},'excludeself',true,'sym',true);
% $ Syntax $
%   - A = slaffinitymat(X, [], nnparams, ...)
%   - A = slaffinitymat(X, X2, nnparams, ...)
%
% $ Arguments $
%   - X:        The sample matrix of the (source) nodes
%   - X2:       The sample matrix of the (target) nodes
%   - nnparams: The cell array of parameters for finding nearest neighbors
%               in the form of {method, ...}. Please refer to slfindnn
%               for details of specifying nnparams.
%   - A:        The constructed affinity matrix
%   
% $ Description $
%   - A = slaffinitymat(X, X2, nnparams, ...) constructs an affinity 
%     matrix to represent the pairwise affinity���ɶ�����ԣ� between neighboring 
%     samples. The affinity between non-neighboring samples is set to
%     zero. You can indicate a self-affinity matrix (affinity among the
%     the set of samples) by setting X2 to []. 
%     By default, the function uses heated kernel to compute the affinity
%     as explained below. In addition, you can use other formulas to 
%     translate the distances to affinity by supplying your tfunctor in 
%     the properties. 
%     The following is a table of properties that you can specify:
%       \*
%       \t   The Properties of Affinity Matrix construction         \\
%       \h     name         &      description                      \\
%             'sparse'      & Whether to construct sparse matrix 
%                             (default = true)                      \\
%             'kernel'      & The kernel to compute affinity         \\
%                             - 'heat': the heated kernel (default) 
%                               it uses the following formula to translate
%                               the Euclidean distances into affinities:
%                                 a = exp(- d^2 / (2 *sigma^2))
%                               Here sigma^2 is set to 
%                                 diffusion^2 * avg(d^2). 
%                               you can set the value of diffusion in the 
%                               properties.
%                             - 'simple':  the simple kernel
%                               just set the affinity of all neighboring
%                               samples to 1.
%             'diffusion'   & The diffusion distance relative to 
%                             the average distance. (default = 1)    \\
%             'tfunctor'    & The function to transform the distance
%                             values to edge values. (default = [])  \\
%             'sym'         & whether to symmetrizes the graph 
%                             (default = true)                       \\
%             'symmethod'   & The method used to symmetrization       
%                             (default = [])                          \\
%             'excludeself' & Whether to exclude the edges connecting
%                             the same node. (default = false).
%       \*
%
% $ Arguments $
%   - The properties sym, symmethod and excludeself only take effect
%     when input X2 = [].
%
% $ Remarks $
%   - It wrapps slnngraph to provide a convenient way to compute
%     typical affinity matrix.
%
% $ History $
%   - Created by Dahua Lin, on Sep 12nd, 2006
%

%% parse input and prepare parameters

if nargin < 3
    raise_lackinput('slaffinitymat', 3);
end

%%%%%��������
tralab = varargin{5};
KK = varargin{6};
varargin(:,6) = [];
varargin(:,5) = [];
%%%%��������
opts.sparse = true;
opts.kernel = 'heat';
opts.diffusion = 1;
opts.tfunctor = [];
opts.sym = true;
opts.symmethod = [];
opts.excludeself = false;
opts = slparseprops(opts, varargin{:});

if isempty(X2) 
    if opts.excludeself
        X2 = [];
    else
        X2 = X;
    end
else
    opts.sym = false;
end

if isempty(opts.tfunctor)
    switch opts.kernel
        case 'heat'
            tfunctor = {@internal_compaffinity, opts.diffusion};
        case 'simple'
            tfunctor = @(x) ones(size(x));
        otherwise
            error('sltoolbox:invalidarg', ...
                'Invalid kernel name: %s', opts.kernel);
    end
else
    tfunctor = opts.tfunctor;
end

%% main wrapper

A = slnngraph(X, X2, nnparams, ...
    'valtype', 'numeric', ...
    'sparse', opts.sparse, ...
    'tfunctor', tfunctor, ...
    'sym', opts.sym, ...
    'symmethod', opts.symmethod, tralab, KK);

%% The internal function to compute affinity


% function affvals = internal_compaffinity(dists, diffusion)
function affvals = internal_compaffinity(dists, diffusion, nnidx, tralab, KK)
    %����S c
sqs = dists .* dists;
sqs = sqs(:);
avgsq = sum(sqs) / length(sqs);
s = (diffusion^2) * avgsq * 2;
affvals = exp(-sqs / s);
 S= exp(-sqs / s);
 Ssize=size(S,1);
 
 
 %����C
 WW=[];
 wwrow=0;
 C=zeros(Ssize,1);
 tralab(tralab~=1)=0;
 
 tranum=sum(tralab,1);
 tranum(tranum~=0)=1;
 tranum=sum(tranum,2);
 
 
 
% tranum=size(tralab,2);
 sumtralab=sum(tralab,2);
 mm=0;
 N=zeros(5,1);
 for m=1:size(nnidx,2)
     for n=1:KK
     if nnidx{1,m}(n,1)<tranum
         mm=mm+1;
     end
 end
 end
 for m=1:size(nnidx,2)
     for n=1:KK
     if nnidx{1,m}(n,1)<tranum
     for j=1:5
        if tralab(j,nnidx{1,m}(n,1))==1
            N(j,1)=N(j,1)+1;
 
        end
        end
     end
 end
 end
 NN=zeros(5,1);
 for i=1:5
     NN(i,1)=N(i,1)/mm;
 end
 
%  tralab1=sumtralab(1)+sumtralab(2)+sumtralab(3)+sumtralab(4)+sumtralab(5)/sumtralab(1);
%  tralab2=sumtralab(1)+sumtralab(2)+sumtralab(3)+sumtralab(4)+sumtralab(5)/sumtralab(2);
%  tralab3=sumtralab(1)+sumtralab(2)+sumtralab(3)+sumtralab(4)+sumtralab(5)/sumtralab(3);
%  tralab4=sumtralab(1)+sumtralab(2)+sumtralab(3)+sumtralab(4)+sumtralab(5)/sumtralab(4);
%  tralab5=sumtralab(1)+sumtralab(2)+sumtralab(3)+sumtralab(4)+sumtralab(5)/sumtralab(5);
 
%  tralab1=(log(tranum)-log(sumtralab(1)))/NN(1,1);
%  tralab2=(log(tranum)-log(sumtralab(2)))/NN(2,1);
%  tralab3=(log(tranum)-log(sumtralab(3)))/NN(3,1);
%  tralab4=(log(tranum)-log(sumtralab(4)))/NN(4,1);
%  tralab5=(log(tranum)-log(sumtralab(5)))/NN(5,1);

tralab1=log(tranum)-log(sumtralab(1))+1;
 tralab2=log(tranum)-log(sumtralab(2))+1;
 tralab3=log(tranum)-log(sumtralab(3))+1;
 tralab4=log(tranum)-log(sumtralab(4))+1;
 tralab5=log(tranum)-log(sumtralab(5))+1;
 zong=tralab1+tralab2+tralab3+tralab4+tralab5;
 for i=1:size(nnidx,2)
    %% i���б�ǩ������
     if i<=tranum;
        for q=1:KK
        j=nnidx{1,i}(q,1);%q
        if j<=tranum;               %% j���б�ǩ����
            C(((i-1)*KK)+q,1)=1-((  sum(    tralab1*abs(tralab(1,i)-tralab(1,j))+tralab2*abs(tralab(2,i)-tralab(2,j))+tralab3*abs(tralab(3,i)-tralab(3,j)) ...
            +tralab4*abs(tralab(4,i)-tralab(4,j))+tralab5*abs(tralab(5,i)-tralab(5,j))))/zong); 
       %C(((i-1)*KK)+q,1)=1-((  sum(abs(tralab(:,i)-tralab(:,j))))/labnum);
         elseif j>tranum;           %% j���ޱ�ǩ����
                jnnidx=nnidx{1,j}; 
                nlj=0;
                sig=0;
                sigma=0;%sig�ǵ����ģ�sigma��Nlj��sig���
                for jj=1:KK
                    if jnnidx(jj,1)<=tranum
                        jnnidxl(nlj+1,1)=jnnidx(jj,1);
                        nlj=nlj+1;
                    else%j �Ľ��ڶ����ޱ�ǩ����
                    end
                end
                
                if nlj==0
                    wwrow=wwrow+1;
                    WW(wwrow,1)=((i-1)*KK)+q;%WW��һ����C�е�����
                else
                    for p=1:nlj%p
                    k=jnnidxl(p); %k��j�Ľ������б�ǩ���������
                    sig=1-((  sum(    tralab1*abs(tralab(1,i)-tralab(1,k))+tralab2*abs(tralab(2,i)-tralab(2,k))+tralab3*abs(tralab(3,i)-tralab(3,k)) ...
            +tralab4*abs(tralab(4,i)-tralab(4,k))+tralab5*abs(tralab(5,i)-tralab(5,k))))/zong); 
                    %sig=1-((sum(abs(tralab(:,i)-tralab(:,k))))/labnum);
                    sigma=sigma+sig;
                    end
                    C(((i-1)*KK)+q,1)=sigma/nlj;
                end;
     end;
     end
 %% i���ޱ�ǩ������
  elseif i>tranum
         for q=1:KK
         j=nnidx{1,i}(q,1);%q
         if j<=tranum;        %%  j���б�ǩ����
            innidx=nnidx{1,i}; 
            nli=0;
            sig=0;
            sigma=0;%sig�ǵ����ģ�sigma��Nlj��sig���
            for ii=1:KK
                if innidx(ii,1)<=tranum
                    innidxl(nli+1,1)=innidx(ii,1);
                    nli=nli+1;
                else%i�Ľ������������ޱ�ǩ
                end
            end
                
                if nli==0
                    wwrow=wwrow+1;
                    WW(wwrow,1)=((i-1)*KK)+q;
                else
                    for p=1:nli%p
                    k=innidxl(p); %k��j�Ľ������б�ǩ���������
                    sig=1-((  sum(    tralab1*abs(tralab(1,j)-tralab(1,k))+tralab2*abs(tralab(2,j)-tralab(2,k))+tralab3*abs(tralab(3,j)-tralab(3,k)) ...
            +tralab4*abs(tralab(4,j)-tralab(4,k))+tralab5*abs(tralab(5,j)-tralab(5,k))))/zong);
                    %sig=1-((sum(abs(tralab(:,j)-tralab(:,k))))/labnum);
                    sigma=sigma+sig;
                    end
                    C(((i-1)*KK)+q,1)=sigma/nli;
                end
         %% j���ޱ�ǩ����,i j�����ޱ�ǩ�����Ĺ���9351��,��һ�����ޱ�ǩ�����������Ҳ���ޱ�ǩ�ĸ���Ϊ201����WW����Ϊ9552
         elseif j>tranum;
                wwrow=wwrow+1;
                WW(wwrow,1)=((i-1)*KK)+q;
         else disp('error2');   
         end;  
    end;
     end;
 end
 %%	C���򻯣�δ�������Ϊ0��Ӱ��
 for i=1:(size(C,1)/KK)
       if sum(C(((i-1)*KK)+1:(i*KK)))~=0
           he=sum(C(((i-1)*KK)+1:(i*KK)));
           for q=1:KK
            C(((i-1)*KK)+q)=C(((i-1)*KK)+q)/he;
           end
       end
 end
%% 
 avg=sum(C)/(size(C,1)-size(WW,1));
 for i=1:size(WW,1) 
    %C(WW(i))=0;
     C(WW(i))=avg;
 end
 
 
 
% %% ����C������С�����ھ������⣬linprog����
% 
%  tralab(tralab~=1)=0;
%   C=[];
% tranum=size(tralab,2);
%   
%   %% ��Pz����
%   Pz=[];
%   avgtralab=mean(tralab,2);%tralabÿ��ƽ��ֵ
%   for i=1:size(nnidx,2)
%     %i���б�ǩ������
%      if i<=tranum;
%          Pz(:,i)=tralab(:,i);
%      elseif i>tranum %i���ޱ�ǩ����
%            innidxl=[];
%          numinnidxl=0;
%          innidx=nnidx{1,i};
%          %ȷ��innidxl
%          for j=1:KK
%             if innidx(j,1)<=tranum%innidx(1,j)��i�Ľ������
%                 numinnidxl=numinnidxl+1;
%                 innidxl(1,numinnidxl)=tralab(1,innidx(j,1));
%                 innidxl(2,numinnidxl)=tralab(2,innidx(j,1));
%                 innidxl(3,numinnidxl)=tralab(3,innidx(j,1));
%                 innidxl(4,numinnidxl)=tralab(4,innidx(j,1));
%                 innidxl(5,numinnidxl)=tralab(5,innidx(j,1));
%             end
%          end
%          if isempty(innidxl)
%              innidxlab=avgtralab;
%          else innidxlab=mean(innidxl,2); %һ������������innidxlÿ��ƽ��ֵ����numinnidxl��
%          end
%          
%     Pz(:,i)=innidxlab;
%      end
%   end
%            
% %%   ��f
% f=zeros(Ssize,1);
% for i=1:size(nnidx,2)
%     
%      for q=1:KK
%          j=nnidx{1,i}(q,1);
%          f((i-1)*KK+q)=(Pz(1,i)-Pz(1,j))^2+(Pz(2,i)-Pz(2,j))^2+(Pz(3,i)-Pz(3,j))^2+(Pz(4,i)-Pz(4,j))^2+(Pz(5,i)-Pz(5,j))^2;
%      end
% end
% %%����lb,ub,Aeq,beq
% lb=zeros(Ssize,1);
% ub=ones(Ssize,1);
% beq=ones(Ssize/KK,1);
% Aeq=zeros(Ssize/KK,Ssize);
% for i=1:(Ssize/KK)
%     for j=1:KK
%         Aeq(i,(i-1)*KK+j)=1;
%     end
% end
% %%
% C= linprog(f,[],[],Aeq,beq,lb,ub);        
%          
        
%% ����SC
affvals=S.*C;










