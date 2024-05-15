
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