$(document).ready(function(){
    $(".kind_select>div").on("click", function(){
        let file_name = $(this).find("img").attr("src");
        let arSplitUrl = file_name.split("/");
        let nArLength = arSplitUrl.length;
        let arFileName = arSplitUrl[nArLength-1];
        let arSplitFileName = arFileName.split(".");
        let sFileName = arSplitFileName[0];
        
        if (sFileName[sFileName.length-1]==1){
            sFileName[sFileName.length-1]=2;
        }
        else{
            sFileName[sFileName.length-1]=1;
        }
        $(this).find("img").attr("src", "./planner2-img/"+sFileName+".png");
    })
});