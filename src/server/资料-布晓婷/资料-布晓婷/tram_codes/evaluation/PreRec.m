function [Pre,Rec]=PreRec(X,Y)
X(X>0) = 1;X(X<=0) = 0;
Y(Y>0) = 1;Y(Y<=0) = 0;
A=sum(X,1);a=0;
B=sum(Y,1);b=0;
Pre=0;Rec=0;
for i=1:size(X,2)
    if A(i)~=0
       a=a+1; 
   Pre=Pre+sum( X(:,i)&Y(:,i))/A(i);
    end
end
for i=1:size(X,2)
    if B(i)~=0
        b=b+1;
    Rec=Rec+sum( X(:,i)&Y(:,i))/B(i);
    end   
end
Pre=Pre/a;
Rec=Rec/b;
end

