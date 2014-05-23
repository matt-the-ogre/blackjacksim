
module.exports = Color;

//# Regular Colors
function Color() {
   this.off = '\033[0m';
   this.black = '\033[0;30m' ;
   this.red =   '\033[0;31m' ;
   this.green = '\033[0;32m' ;
   this.yellow = '\033[0;33m' ;
   this.blue = '\033[0;34m' ;
   this.purple = '\033[0;35m' ;
   this.cyan = '\033[0;36m' ;
   this.white = '\033[0;37m' ;
}

//   # High Intensty
// '\[\033[0;90m\]'
// # Black
// '\[\033[0;91m\]'
// # Red
//   '\[\033[0;92m\]'
// # Green
// '\[\033[0;93m\]'
// # Yellow
//   '\[\033[0;94m\]'
// # Blue
// '\[\033[0;95m\]'
// # Purpl
//   e'\[\033[0;96m\]'
// # Cyan
// '\[\033[0;97m\]'
// # White

//   # Background
//   '\[\033[40m\]'
// # Black
// '\[\033[41m\]'
// # Red
//   '\[\033[42m\]'
// # Green
// '\[\033[43m\]'
// # Yellow
//   '\[\033[44m\]'
// # Blue
// '\[\033[45m\]'
// # Purple
//   '\[\033[46m\]'
// # Cyan
// '\[\033[47m\]'
// # White

//   # High Intensty backgrounds
//   '\[\033[0;100m\]'
// # Black
// '\[\033[0;101m\]'
// # Red
//   '\[\033[0;102m\]'
// # Green
// '\[\033[0;103m\]'
// # Yellow
//   '\[\033[0;104m\]'
// # Blue
// '\[\033[10;95m\]'
// # Purple
//   '\[\033[0;106m\]'
// # Cyan
// '\[\033[0;107m\]'
// # White
