export default function isAccent(string = ''){

  let newString = string

  const AcceptCaracteres = [".",",",";"];
  if(string.length === 0 || string === ''){
    return null
  }

  AcceptCaracteres.map(letter => {
    if(newString.includes(letter)){
      newString = newString.replaceAll(letter, "")
    }
  })

  newString = newString.normalize("NFD").replace(/[a-z]/g, "");
  newString = newString.replaceAll(' ', '');

  return newString.length === 0 ? false : true
}