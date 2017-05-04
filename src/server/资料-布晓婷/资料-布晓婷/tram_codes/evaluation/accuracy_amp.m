function AccAMP= accuracy_amp(X,Y)
X(X>0) = 1;X(X<=0) = 0;
Y(Y>0) = 1;Y(Y<=0) = 0;
AccAMP=0;a=0;
for i=1:size(X,2)
    if sum( X(:,i)|Y(:,i))~=0
        a=a+1;
   AccAMP=AccAMP+sum( X(:,i)&Y(:,i))/sum( X(:,i)|Y(:,i));
    end
end
AccAMP=AccAMP/a;
end
