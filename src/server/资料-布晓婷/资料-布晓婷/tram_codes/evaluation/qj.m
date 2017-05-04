function [Sn,Sp,Acc,MCC] = qj(X,Y)%X是预测的标签Pre_label,Y是真实标签test_label
X(X>0) = 1;X(X<=0) = 0;
Y(Y>0) = 1;Y(Y<=0) = 0;%将标签改成0或1
testnum=size(Y,2);
pre_kang=zeros(1,testnum);
test_kang=zeros(1,testnum);
Tp=0;
Fp=0;
Tn=0;
Fn=0;

for j=1:testnum%j为列数
    if ~isequal(X(:,j),[0;0;0;0;0])
        pre_kang(1,j)=1;
    end
end
for j=1:testnum%j为列数
    if ~isequal(Y(:,j),[0;0;0;0;0])
        test_kang(1,j)=1;
    end
end
for j=1:testnum
if (pre_kang(1,j)==1)&&(test_kang(1,j)==1)
    Tp=Tp+1;
end
if  (pre_kang(1,j)==1)&&(test_kang(1,j)==0);
    Fp=Fp+1;
end
   if (pre_kang(1,j)==0)&&(test_kang(1,j)==0)
    Tn=Tn+1;
   end
if (pre_kang(1,j)==0)&&(test_kang(1,j)==1);
    Fn=Fn+1;
end
end
% XTpY = X&Y;%Tp是同时是抗菌肽，Fp是预测是抗菌肽实际不是，TN是预测没抗性实际也没抗性
% XFpY = X&(~Y);
% XTnY=(~X)&(~Y);%或非
% XFnY=(~X)&Y;
% 
% 
% Tp=sum(XTpY(:));
% Fp=sum(XFpY(:));
% Tn=sum(XTnY(:));
% Fn=sum(XFnY(:));
if   Fn==0
    Sn=1;
elseif Tp==0
   Sn=0 ;
else
 Sn=Tp/(Tp+Fn);
end
if  Fp==0
    Sp=1;
elseif Tn==0
    Sp=0;
else
   Sp=Tn/(Tn+Fp);
end
if Fp==0&&Fn==0
    Acc=1;
elseif Tn==0&&Tp==0
    Acc=0;
else
Acc=(Tp+Tn)/(Tp+Tn+Fp+Fn);
end
if  Fn==Fp
    MCC=1;
elseif  Fn==Tp&&Tn==Fp
    MCC=0;
elseif  Tp==0&&Tn==0
    MCC=-1;
else
MCC=((Tp*Tn)-(Fp*Fn))/sqrt((Tp+Fp)*(Tp+Fn)*(Tn+Fp)*(Tn+Fn));
end
end
