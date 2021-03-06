
// Keep track of our socket connection
var socket;

// Start a socket connection to the server
//socket = io.connect('http://192.168.0.15:8000');


function getData(){
    return {
      results: [
            {
                title: "video.mp4",
                embedLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/gcrQvoCzs80" frameborder="0" allowfullscreen></iframe>',
                shareLink: "shareurl.youtube.com",
                thumbnail: "thumbnail.jpg",
                publishedAt: "2015-12-21Thh:mm:ss",
                tag: "",
                hasBeenTagged: false
            },
            {
                title: "video.mp4",
                embedLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/D9Mv6gXqADM" frameborder="0" allowfullscreen></iframe>',
                shareLink: "shareurl.youtube.com",
                thumbnail: "thumbnail.jpg",
                publishedAt: "2015-12-21Thh:mm:ss",
                tag: "tag1",
                hasBeenTagged: true
            },
            {
                title: "video.mp4",
                embedLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/y5k5e9RW8Og" frameborder="0" allowfullscreen></iframe>',
                shareLink: "shareurl.youtube.com",
                thumbnail: "thumbnail.jpg",
                publishedAt: "2015-12-20Thh:mm:ss",
                tag: "tag2",
                hasBeenTagged: true
            },
            {
                title: "video.mp4",
                embedLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/K9qfaTBCYSA" frameborder="0" allowfullscreen></iframe>',
                shareLink: "shareurl.youtube.com",
                thumbnail: "thumbnail.jpg",
                publishedAt: "2015-12-20Thh:mm:ss",
                tag: "",
                hasBeenTagged: false
            },
            {
                title: "video.mp4",
                embedLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/RL52R7m8b7w" frameborder="0" allowfullscreen></iframe>',
                shareLink: "shareurl.youtube.com",
                thumbnail: "thumbnail.jpg",
                publishedAt: "2015-12-20Thh:mm:ss",
                tag: "",
                hasBeenTagged: false
            },
            {
                title: "video.mp4",
                embedLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/UQx1sqPHTrk" frameborder="0" allowfullscreen></iframe>',
                shareLink: "shareurl.youtube.com",
                thumbnail: "thumbnail.jpg",
                publishedAt: "2015-12-19Thh:mm:ss",
                tag: "tag2",
                hasBeenTagged: true
            },
            {
                title: "video.mp4",
                embedLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/mgVwv0ZuPhM" frameborder="0" allowfullscreen></iframe>',
                shareLink: "shareurl.youtube.com",
                thumbnail: "thumbnail.jpg",
                publishedAt: "2015-12-18Thh:mm:ss",
                tag: "",
                hasBeenTagged: false
            },
            {
                title: "video.mp4",
                embedLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Jmqa99Ar1Hs" frameborder="0" allowfullscreen></iframe>',
                shareLink: "shareurl.youtube.com",
                thumbnail: "thumbnail.jpg",
                publishedAt: "2015-12-18Thh:mm:ss",
                tag: "tag1",
                hasBeenTagged: true
            },
            {
                title: "video.mp4",
                embedLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/rVTwgQ76l-g" frameborder="0" allowfullscreen></iframe>',
                shareLink: "shareurl.youtube.com",
                thumbnail: "thumbnail.jpg",
                publishedAt: "2015-12-17Thh:mm:ss",
                tag: "tag1",
                hasBeenTagged: true
            },
            {
                title: "video.mp4",
                embedLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/PXBJIZ1NXFU" frameborder="0" allowfullscreen></iframe>',
                shareLink: "shareurl.youtube.com",
                thumbnail: "thumbnail.jpg",
                publishedAt: "2015-12-17Thh:mm:ss",
                tag: "",
                hasBeenTagged: false
            },
            {
                title: "video.mp4",
                embedLink: '<iframe width="560" height="315" src="https://www.youtube.com/embed/cP6VqB4klpQ" frameborder="0" allowfullscreen></iframe>',
                shareLink: "shareurl.youtube.com",
                thumbnail: "thumbnail.jpg",
                publishedAt: "2015-12-16Thh:mm:ss",
                tag: "tag1",
                hasBeenTagged: true
            }
        ]
    };
}

function filterOriginalOrder(){
    iso.arrange({
        filter: "*"
    });
}

function filterToday(){
    var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        filterToday = y + "-" + m + "-" + d;
    iso.arrange({
        filter: function(video){
            return video.getAttribute("data-publishedAt") == filterToday;
        }
    });
}

function filterDate(){
    var filterDate = document.querySelector("input[data-filter-by='date']").value;
    if (filterDate > "2015-12-01"){ //add a high-end constraint, if you want
        iso.arrange({
            filter: function(video){
                return video.getAttribute("data-publishedAt") == filterDate;
            }
        });
    }
}

function filterTag(){
    var filterTag = document.querySelector("input[type='text']").value;
    if (filterTag && filterTag !== ""){
        iso.arrange({
            filter: function(video){
                return video.getAttribute("data-tag") == filterTag;
            }
        });
    }
}

var data = getData();

data.results.forEach(function(datum){
    var div = document.createElement("div"),
        publishedAt, embedLink;
    //alter publishedAt timestamp; get rid of HH:MM:SS
    publishedAt = datum.publishedAt.split("T")[0];
    //create filterable attributes on the div
    div.setAttribute("data-publishedAt", publishedAt);
    div.setAttribute("data-tag", datum.tag);
    //alter embedLink to reduce size
    embedLink = datum.embedLink.replace('width="560"', 'width="150"').replace('height="315"', 'height="84"');
    //add to DOM
    div.innerHTML = embedLink;
    document.getElementById("grid").appendChild(div);
});

var iso = new Isotope("#grid", {
    getSortData: {
        publishedAt: '[data-publishedAt]',
        tag: '[data-tag]'
    }
});

//event listeners
document.querySelector("input[data-filter-by='original-order']").addEventListener("click", filterOriginalOrder);
document.querySelector("input[data-filter-by='today']").addEventListener("click", filterToday);
document.querySelector("input[data-filter-by='date']").addEventListener("change", filterDate);
document.querySelector("input[type='text']").addEventListener("keypress", function(e){
    var keyCode = e.keyCode || e.which;
    if (keyCode == "13"){
        filterTag();
        return false;
    }
});