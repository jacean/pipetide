function bili=bili_evaluation(A,B,C)
%A����geshu����ǰ460��Ϊ��ţ���461��Ϊ����ͳ�ƣ�B����pre,C����shiji
bili=zeros(1,5);
for m=1:5%mΪ����
    for count=1:A(461,m)
        if B(:,A(count,m))==C(:,A(count,m))
        bili(1,m)=bili(1,m)+1;
        end
    end
   %bili(1,m)=bili(1,m)/A(461,m);
end

