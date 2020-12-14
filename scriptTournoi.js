function cleanSheet(){
    var sheet = SpreadsheetApp.getActiveSheet()
    sheet.getRange(4,3,16,4).setValue('')
    sheet.getRange(4,8,16,4).setValue('')
    }
function getPlayerInfo(player)
{
  var sheet = SpreadsheetApp.getActiveSheet()
  var response = UrlFetchApp.fetch("https://aoe2.net/leaderboard/aoe2de/rm-1v1?search[value]="+player);
  var data = JSON.parse(response.getContentText());
  try{
    if (player=="Ice"){ // Si AoE2.net ne trouve pas le bon joueur alors on utilise son Identifiant Steam
      return getDatabyid("76561197981989272")
    }
    if (player=="Iron"){ // Si AoE2.net ne trouve pas le bon joueur alors on utilise son Identifiant Steam
      return getDatabyid("76561198201736510")
    }
    
  return [data['data'][0][3],data['data'][0][10],data['data'][0][12],new Date(data['data'][0][17]*1000)]
  }
  catch (e){
    Logger.log(player+'\t'+ data['data'])
    return ['','','','']
  }
}

function setDate(){
  var sheet = SpreadsheetApp.getActiveSheet()
  var date= new Date();
  var currentTime = new Date();
  Logger.log(currentTime);
  sheet.getRange(1,1).setValue('Last update:')
  sheet.getRange(1,2).setValue(currentTime)
}

function main(){
  cleanSheet()
  var i = 0 // Initialisation du premier élément de l'array (lstPlayer)
  var lstPlayer = ["Haze Kolbasi", "Grimm.", "Scramble", "Wolf_silver", "Berserker.", "Carpect", "Grixx the Almighty", "BreizhWizard.", "Azuthor", "Zyxuwyz", "Al_Kaa", "Jacquouille la fripouille", "Heretik", "Arch.", "Krispy", "Kitchiro",
                   "Fujichan", "Zone onze", "Babyxandre","Cypher", "Mr.smeagoul.", "L'arcadia", "Breizh", "Skydrogz", "WarrickFr.", "Flowas", "Haktona", "Sakk???", "Apath1", "Tolbiac", "skyleck", "Glork"]; // Ajout de tous les joueurs
  var sheet = SpreadsheetApp.getActiveSheet()
  for (var y = 4; y < 20; y++) {
    // Get players name & data 
    var player1 = sheet.getRange(y,2).getValue();// row,col
    var player2 = sheet.getRange(y,7).getValue();
    
    if (i < lstPlayer.length){ // Tant que i est inférieur à 32 alors on ajoute les joueurs
      var data1 = getPlayerInfo(lstPlayer[i]) // Ajout du premier joueur "Toref" et ainsi de suite ("Berseker", "Nain_culte", etc...) 
      var data2 = getPlayerInfo(lstPlayer[i+1]) // Ajout du second joueur "Ice" et ainsi de suite ("Carpect", "Ozego", etc...)
      i += 2;
    }
// Ajout des noms des joueurs
//    sheet.getRange(y,2,1,4).setValue(lstPlayer[i]) 
//    sheet.getRange(y,7,1,4).setValue(lstPlayer[i+1])
//    i += 2;
    sheet.getRange(y,3,1,4).setValues([data1])
    sheet.getRange(y,8,1,4).setValues([data2])
    
  }
  setDate()
}


function getData(){
  var response = UrlFetchApp.fetch("https://aoe2.net/leaderboard/aoe2de/rm-1v1?search[value]="+'yosaii');
  var data = JSON.parse(response.getContentText());
  Logger.log([data['data'][0][2],data['data'][0][9],data['data'][0][12]])
  return data['data'][0]
  return [data['data'][0][3],data['data'][0][9],data['data'][0][12],new Date(data['data'][0][16]*1000)]
  }
function getDatabyid(steamID){
  var response = UrlFetchApp.fetch("https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=3&start=1&count=1&steam_id="+steamID)
  var data = JSON.parse(response.getContentText());
  winpercentage = (data['leaderboard'][0]['wins'] / data['leaderboard'][0]['games'] * 100).toFixed(2)
  Logger.log( [ data['leaderboard'][0]['rating'],data['leaderboard'][0]['games'],winpercentage])
  return [ data['leaderboard'][0]['rating'],data['leaderboard'][0]['games'],winpercentage, new Date(data['leaderboard'][0]["last_match_time"]*1000)]
}

