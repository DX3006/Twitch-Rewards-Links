
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
      x.classList.remove('iUXhKY');
      x.classList.add("iUXhKY")
      //x.style.cssText = 'background-color: #101014; tra1nsition:ease background-color .1s;';
    }
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
            a = a.substring(0, x) + a.substring(x).replace(n[c2], '<a  href="' + n[c2] + '" target="_blank" >' + n[c2] + '</a>')
        }
        mensagem.innerHTML = a;
        mensagem.addEventListener('click', clicado)
        mensagem.addEventListener('auxclick', clicado)
    }
}

async function run() {
    var divStyle = document.createElement("div")
    divStyle.id = "divStyle"
    divStyle.innerHTML = "<style>.redemption-list-item__body {max-width: 800px;padding: 1rem;}.clicado{background-color:  #101014 !important;transition:ease background-color .1s}.kmoRtg_alt{margin-top: 0.5rem !important; padding-left: 1rem !important;}</style>"
    document.body.appendChild(divStyle)

    while (true) {
        d = document.getElementsByClassName("Layout-sc-nxg1ff-0 fyCODJ redemption-list-item__context")
        while (d.length > 0) {
            ccs = d[0].getElementsByClassName("CoreText-sc-cpl358-0 dcwJzv")
            mensagem = ccs[0]
            if (mensagem) addLink(mensagem);
            d[0].classList.add("kmoRtg_alt")
            d[0].classList.remove("fyCODJ")
        }
        //console.log(links)
        await sleepTime(500);
    }
}
run()