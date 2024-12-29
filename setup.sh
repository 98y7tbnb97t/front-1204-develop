#!/bin/bash
#set -ex
Fcheck=''
Finstall=''
Fnvm=''
Fexpress=''
Ffront=''
Fback=''
IP=$1
SSH_opt='-o StrictHostKeyChecking=no'
shift
while :; do case "$1" in
  "back") Fback=1; shift ;;
  "front") Ffront=1; shift ;;
  "check") Fcheck=1; shift ;;
  "install") Finstall=1; shift ;;
  "nvm") Fnvm=1; shift ;;
  "express") Fexpress=1; shift ;;
  "help"|"-h"|"--help") echo "Function: back front check install nvm express help"; exit ;;
  *) break ;;
esac; done
#ssh-keyscan -t rsa $IP >> ~/.ssh/known_hosts
#[ $1 == "back" ] && Fback=1
#[ $1 == "front" ] && Ffront=1
#exit
# Установка веб сервера
[ $Finstall ] && {
    echo "Установка mongo,nginx"
    curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
        gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
	tee /etc/apt/sources.list.d/mongodb-org-7.0.list
    apt update
    apt upgrade -y
    apt install -y gnupg curl mongodb-org nginx
    cp config/api.test.araratchess.com /etc/nginx/sites-available
    ln -sf /etc/nginx/sites-available/api.test.araratchess.com /etc/nginx/sites-enabled/api.test.araratchess.com
    /usr/bin/mongod --config /etc/mongod.conf
    #systemctl start mongod
    #systemctl enable mongod
}
# Установка nvm
[ $Fnvm ] && {
    echo "Установка nvm"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh > /root/install_nvm.sh
    chmod +x /root/install_nvm.sh
    /root/install_nvm.sh
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" > /dev/null # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" > /dev/null 
    # Установка nodejs
    echo "Установка nodejs"
    nvm install 18.17.0 > /dev/null
}
[ $Fexpress ] && {
    echo "Установка express & pm2"
    npm install express
    npm install pm2 -g
}


[ $Ffront ] && {
    echo "Building the frontend..."

    npm i --force
    npm run build
}

# Проверка
[ $Fcheck ] && {
    echo "Check npm..."
    apt update
    apt install -y nodejs npm >/dev/null
    echo "rc=$?"
    node -v && npm -v
    echo "rc=$?"
}

[ $Fback ] && {
    echo "Building the backend server..."
    ssh root@$IP $SSH_opt 'systemctl restart mongod'
    msg="cd /root/repo/backend"
    msg="$msg && source ~/.nvm/nvm.sh"
    msg="$msg && pm2 update >/dev/null"
    msg="$msg && pm2 restart index.js"
    msg="$msg && pm2 save"
    ssh root@$IP $SSH_opt $msg
}
