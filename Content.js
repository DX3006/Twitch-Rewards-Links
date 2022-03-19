
re = /(https?:\/\/)?(www.)?(\d|-|\w)+(\.\w+)+(\/[^/\s]+)*/gi
links = []

function sleepTime(timeS) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, timeS)
    })
}

function clicado(t) {
    if (t.target) {
        x = t.target.parentElement
        if(x.tagName=="P"){
          links.push(t.target.innerHTML)
        }
    } else {
        x = t        
    }
    if(x.tagName=="P"){
      x = x.parentElement.parentElement.parentElement.parentElement;
      x.classList.add("clicado")
      //x.style.cssText = 'background-color: #101014; tra1nsition:ease background-color .1s;';
    }
}

function removeHTMLentities(text){
    return text.replace(/[\u00A0-\u9999"'<>\&]/g, function(i) {
        return '&#'+i.charCodeAt(0)+'; ';
     });
}


async function addLink(mensagem) {
    n = mensagem.innerHTML.match(re)
    if (n) {
        a = mensagem.innerHTML
        for (c2 = 0; c2 < n.length; c2++) {
            if (links.includes(n[c2])) {
                clicado(mensagem)
            }
            x = a.lastIndexOf(">") + 1
            link = n[c2]
            if( !/https:\/\//.test(link) ) link= "https:\/\/"+link
            //link=removeHTMLentities(link)
            a = a.substring(0, x) + a.substring(x).replace(n[c2], '<a  href="' + link + '" target="_blank" >' + n[c2] + '</a>')
        }
        mensagem.innerHTML = a;
        mensagem.addEventListener('click', clicado)
        mensagem.addEventListener('auxclick', clicado)
    }
}

async function run() {
    var divStyle = document.createElement("div")
    divStyle.id = "divStyle"
    divStyle.innerHTML = "<style>.redemption-list-item__context { border-left: 3px solid #adadb8; }.redemption-list-item__context_alt { border-left: 3px solid #adadb8; } .redemption-list-item__body {max-width: 800px;padding: 1rem;}.clicado{background-color:  #101014 !important;transition:ease background-color .1s}</style>"
    document.body.appendChild(divStyle)

    while (true) {
        d = document.getElementsByClassName("redemption-list-item__context")
        while (d.length > 0) {
            mensagem = d[0].getElementsByTagName("p")[0];
            if (mensagem) addLink(mensagem);
            d[0].classList.add("redemption-list-item__context_alt")
            d[0].classList.remove("redemption-list-item__context")
        }
        //console.log(links)
        await sleepTime(500);
    }
}
run()