function [AbT]=absolute_ture(X,Y)
X(X>0) = 1;X(X<=0) = 0;
Y(Y>0) = 1;Y(Y<=0) = 0;
AbT=0;
for i=1:size(X,2)
    if  X(:,i)==Y(:,i)
       AbT=AbT+1; 
    end
end
AbT=AbT/size(X,2);
end