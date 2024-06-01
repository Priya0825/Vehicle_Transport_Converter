var dataset=[
    ["Maruti Suzuki Alto",140,22.05,35,771.75,"/images/Alto.jpg"],
    ["Hyundai i20",180,20.35,37,753.05,"/images/I20.jpg"],
    ["Tata Nexon",180,17.57,44,772.68,"/images/Nexon.jpg"],
    ["Honda City",180,17.8,40,712.00,"/images/city.jpg"],
    ["Mahindra Thar",155,15.2,57,866.40,"/images/Thar.jpg"],
    ["Toyota Innova Crysta",179,11.25,55,618.75,"/images/Crysta.jpg"],
    ["Kia Seltos",170,16.8,50,840.00,"/images/Kia.jpg"],
    ["Renault Kwid",150,22.3,28,624.40,"/images/Kwid.jpg"],
    ["Ford EcoSport",182,15.9,52,826.80,"/images/Ford.jpg"],
    ["Tata Tiago",150,23.84,35,834.40,"/images/Tiago.jpg"]
];
var vehicleIndex=-1;
function vehicleSelected(index){
    vehicleIndex=index;
    document.getElementById('veh').innerText=dataset[index][0];
    document.getElementById('drop-menu').style.display='none';
    showProfile();
}

function calculate(){
    let val=document.getElementById('dis').value;
    if(val.length==0){
        alert("Enter distance First ");
        return;
    }
    if(vehicleIndex==-1){
        alert("Choose Vehicle First");
        return;
    }
    let dis=parseFloat(document.getElementById('dis').value);
    let speed=dataset[vehicleIndex][1];
    let time=dis/speed;
    let fuel=dis/dataset[vehicleIndex][2];
    let hrs=parseInt(time);
    let min=60*(time-hrs);
    //round min to integer and fuel to 2 decimal places
    min=parseInt(min);
    fuel=parseInt(fuel*100)/100;
    time=hrs+" Hrs  and  "+min+" min";
    showResults(dis,time,fuel);
}
function showProfile(){
    document.getElementById('calculations').style.display='none';
    document.getElementById('profile').style.display='flex';
    document.getElementById('carName').innerHTML=dataset[vehicleIndex][0];
    document.getElementById('carSpeed').innerHTML="Top Speed (KM/L) : "+dataset[vehicleIndex][1];
    document.getElementById('carEff').innerHTML="Fuel Efficiency (KM/L) : "+dataset[vehicleIndex][2];
    document.getElementById('carTank').innerHTML="Fuel Tank Capacity (L) : "+dataset[vehicleIndex][3];
    document.getElementById('carRange').innerHTML="Max Range (KM) : "+dataset[vehicleIndex][4];
    document.getElementById('carImg').src=dataset[vehicleIndex][5];
}
function showResults(dis,time,fuel){
    document.getElementById('calculations').style.display='flex';
    document.getElementById('compare').style.display='none';
    if(dis>dataset[vehicleIndex][4]){
        document.getElementById('alertDis').style.display='block';
        document.getElementById('disCal').style.display='none';
        document.getElementById('timeCal').style.display='none';
        document.getElementById('fuelCal').style.display='none';
    }else{
        document.getElementById('alertDis').style.display='none';
        document.getElementById('disCal').style.display='block';
        document.getElementById('timeCal').style.display='block';
        document.getElementById('fuelCal').style.display='block';
        document.getElementById('disCal').innerHTML='Distance covered (KM) : '+dis;
        document.getElementById('timeCal').innerHTML='Time Taken : '+time;
        document.getElementById('fuelCal').innerHTML='Fuel Consumed (L) : '+fuel;
    }
}

function showComparison(){
    let val=document.getElementById('dis').value;
    if(val.length==0){
        alert("Enter distance First ");
        return;
    }
    if(vehicleIndex==-1){
        alert("Choose Vehicle First");
        return;
    }
    document.getElementById('calculations').style.display='none';
    document.getElementById('compare').style.display='block';
    let dis=parseFloat(val);
    let speed=dataset[vehicleIndex][1];
    let time=dis/speed;
    let fuel=dis/dataset[vehicleIndex][2];
    let hrs=parseInt(time);
    let min=60*(time-hrs);
    min=parseInt(min);
    if(min.length==1)
        min='0'+min;
    fuel=parseInt(fuel*100)/100;
    time=hrs+":"+min+" Hrs"
    if(dis<=dataset[vehicleIndex][4]){
        document.getElementById('head').innerHTML="<div id=\"carHead\"><div class=\"name\"><p>"+dataset[vehicleIndex][0]+"</p></div><div class=\"status\"><div class=\"calc\"><p id=\"calcTime\">Time : "+time+"</p><p id=\"calcFuel\">Fuel : "+fuel+"</p></div></div></div>";
    }else{
        document.getElementById('head').innerHTML="<div id=\"carHead\"><div class=\"name\"><p>"+dataset[vehicleIndex][0]+"</p></div><div class=\"status\"><div class=\"overflowHead\"><p>Max Range Exceeded</p></div></div></div>";
    }
    let codeOthers="";
    for(let i=0;i<10;i++){
        if(i!=vehicleIndex){
            let speed=dataset[i][1];
            let time=dis/speed;
            let fuel=dis/dataset[i][2];
            let hrs=parseInt(time);
            let min=60*(time-hrs);
            min=parseInt(min);
            if(min.length==1)
                min='0'+min;
            fuel=parseInt(fuel*100)/100;
            time=hrs+":"+min+" Hrs"
            if(dis<=dataset[i][4]){
                codeOthers+="<div id=\"car\"><div class=\"name\"><p>"+dataset[i][0]+"</p></div><div class=\"status\"><div class=\"calc\"><p id=\"calcTime\">Time : "+time+"</p><p id=\"calcFuel\">Fuel : "+fuel+"</p></div></div></div>";
            }else{
                codeOthers+="<div id=\"car\"><div class=\"name\"><p>"+dataset[i][0]+"</p></div><div class=\"status\"><div class=\"overflow\"><p>Max Range Exceeded</p></div></div></div>";
            }
        }
    }
    document.getElementById('others').innerHTML=codeOthers;
}