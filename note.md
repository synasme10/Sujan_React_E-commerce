
### SPA single page application
extended js- js ra html combined

component can be statefull and

## 
pages
-any view that gets loaded by url

## state and props
-state are those store
-state are volitile
-props are those data which is incoming to the component
-props are readonly data
hook-state use garna lai
-state hooks cannot be changed at top level on react component
-hooks can only be used with functional component

effecthook or side eeffect le render sidyo hai bhanna lai help garxa


## webhooks
-function that manupulates a component
-hook functions starts with a keyword ''use''
-statehook,effecthook, refhook,contexthook, performance based hook
- useState(), useEffecct()


HOC-higher order component
LOC-lower 

## storage
a. cookie storage
limited 
- per domain max of 50 cookie
- per cookie 4096 chars
- self destroy on maturity
- can be manipulated by client
- document.cookie="" set garne bela esari garne 



b. web storage
- local storage
    - persisting/ jaba samma clear gardaina taba samma
    - 5mb 
    - never destroy 
    - never matures
    localStorage.getItem()
    localStorage.setItem()
    localStorage.clear()
    localStorage.removeItem()

- session
    - never shared between two tabs
    -5 mb
    - it mature when tab
    sessionStorage.getItem()
    sessionStorage.setItem()
    sessionStorage.clear()
    sessionStorage.removeItem()



    yarn aes,crytojs to encrypt and decrypt while storing data in localstorage 
    crytojs ma sha use nagarnu hola decrypot garna mildaina 

    ckeditor for react : data haru html tag ma acha bhaye teslai run garna help 
    strong tag kunai description ma rakheko cha bhaye tyo strong lai apply garna help

    redux use garda core concept ma kaam garna parxa where u have to use tin ta chij auta store , reducer and action for redux implementation
    store- central store jaha data state maintain hunxa
    reducer = tyo central store ma bhayena data,state lai manipulate garna ko lagi lekhne funcation ko action haru lekhne thau bhayo
    trigger chainxa tyo ho react action
    -esma chai reducer haru lekhna ali garo cha 



    redux toolkit-esle chai hamlai chiane official redux ko package, including teslai chaina batteries haru , support ko middleware haru.we use this. 
    redux toolkit lai react sanga use garne ko lagi hamilai bridge cchainxa tyo bhanya react redux package. Redux is seperate technology that can be use in other any platform(vue, native js, corejs, angular). it is state management platform.