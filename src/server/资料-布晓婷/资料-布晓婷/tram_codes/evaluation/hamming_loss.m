function HL=hamming_loss(X,Y)
X(X>0) = 1;X(X<=0) = 0;
Y(Y>0) = 1;Y(Y<=0) = 0;
HL=0;
for i=1:size(X,2)
   HL=HL+(sum( X(:,i)|Y(:,i))-sum( X(:,i)&Y(:,i)))/5;
end
HL=HL/size(X,2);
end