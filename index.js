const openalpr = require ("node-openalpr")
 
const findImage = (file) => file.endsWith( '.jpg' ) || file.endsWith( '.png' )

const getFiles = (PATH) => 
  fs.readdirSync(PATH)
    .filter( findImage )

const identify = ( path, id, arr ) => 
  openalpr.IdentifyLicense( path, ( error, output ) => {
    const results = output.results
    // console.log(`id`, id)
    // console.log(`path`, path)
    // console.log(`error`, error)
    // console.log(`output`, output)
    console.log(id +" "+ output.processing_time_ms +" "+ ((results.length > 0) ? results[0].plate : "No results"))

    if (id === arr.length - 1) 
      console.log (openalpr.Stop ())
  })

 
const options = {
  state: 'az',
  detectRegion: false
} 

openalpr.Start(options)
openalpr.GetVersion()

getFiles('./').map( identify )


// @@@####