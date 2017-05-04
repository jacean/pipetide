function bili=bili_evaluation(A,B,C)
%A代表geshu矩阵，前460行为序号，第461行为个数统计，B代表pre,C代表shiji
bili=zeros(1,5);
for m=1:5%m为列数
    for count=1:A(461,m)
        if B(:,A(count,m))==C(:,A(count,m))
        bili(1,m)=bili(1,m)+1;
        end
    end
   %bili(1,m)=bili(1,m)/A(461,m);
end

