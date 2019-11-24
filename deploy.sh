chmod 400 $pem_key
ssh -o "StrictHostKeyChecking=no" -i $pem_key $machine@$IP "rm -rf engi-s-cinema && mkdir engi-s-cinema"
scp -r -o "StrictHostKeyChecking=no" -i $pem_key * $machine@$IP:~/engi-s-cinema
