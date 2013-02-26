function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function convertToDate(x){
    var xyear = x.substring(0,4);
    var xmonth = x.substring(5,7)-1;
    var xday = x.substring(8,10);
    return new Date( xyear, xmonth, xday );
}

function makeDateString(x){
    var xdate = convertToDate(x);
    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    return monthNames[xdate.getMonth()] + " " + xdate.getDate() + ", " + xdate.getFullYear();
}

//sort events
function SortByStartDate(a, b){
    var aDate = convertToDate(a.event_start_date);
    var bDate = convertToDate(b.event_start_date);
    return ((aDate < bDate) ? -1 : ((aDate > bDate) ? 1 : 0));
} 

function goBack() {
	history.back();
	return false;
}
