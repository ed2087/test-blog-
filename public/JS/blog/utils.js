//copy to clip board
const tags = [
    {
        pTag : `<p class=""></p>`
    },
    {
        spanTag : `<span class=""></span>`
    },
    {
        h1Tag : `<h1 class=""></h1>`
    },
    {
        aTag : `<a class="" href="link"></a>`
    },
    {
        h2Tag : `<h2 class=""></h2>`
    },
    {
        h3Tag : `<h3 class=""></h3>`
    },
    {
        hr : `<hr>`
    },
    {
        br : `<br>`
    }

];



const copyCode = (e) => {   

    const data = e.target.dataset.sett;

    const copy = (text) => {

        var input = document.body.appendChild(document.createElement("input"));
        input.value = text;
        input.focus();
        input.select();
        document.execCommand('copy');
        input.parentNode.removeChild(input);

    }
    
    tags.forEach((ele, i)=> {
        let obj = Object.keys(ele)[0];
        
        if(obj === data){

            switch (obj) {
                case "pTag":
                        copy(ele.pTag)
                    break;
                    case "spanTag":
                        copy(ele.spanTag)
                    break;
                    case "h1Tag":
                        copy(ele.h1Tag)
                    break;
                    case "h2Tag":
                        copy(ele.h2Tag)
                    break;
                    case "h3Tag":
                        copy(ele.h3Tag)
                    break;
                    case "aTag":
                        copy(ele.aTag)
                    break;
                    case "hr":
                        copy(ele.hr)
                    break;
                    case "br":
                        copy(ele.br)
                    break;
            
                default:
                    break;
            }

                       
        }
    });
    
    

}


qsa(".btn_sett").forEach(ele => {

    ele.addEventListener("click", copyCode);

});














// detect wen something happens in text box
id("BMarkDown").oninput = (e) => {
    id("mirr_w").innerHTML = e.target.value
};




  















//var config = { attributes: true };

// const observer = new MutationObserver(mutation => {
//     console.log('DOM mutation detected');
// });

// observer.observe(id("BMarkDown"), config);


// console.log(id("BMarkDown"))