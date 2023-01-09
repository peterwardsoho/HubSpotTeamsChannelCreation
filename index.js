
// import { graph } from "@pnp/graph";
// import { AdalFetchClient } from "@pnp/nodejs";

const {graph} =require('@pnp/graph');
const {AdalFetchClient}=require('@pnp/nodejs');




var date = new Date();
var newDateObj = new Date();
newDateObj.setTime(date.getTime() - (22*60 * 1000));

var time2 = newDateObj.getTime();
console.log("The time is: " + time2);
//Replace url and url2 with time2 after testing
var fetch = require("node-fetch");

var url = 'https://api.hubapi.com/deals/v1/deal/recent/created?hapikey=&properties=dealname&properties=type&since=' + time2;
console.log("The url is: " + url);
getHubspotData(url);


function getHubspotData(url) {
    fetch(url)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function (data) {
            //console.log(JSON.stringify(data, null, 2));
            JSON.stringify(data, null, 2);

            console.log("Before the Loop");
            console.log("1st Deal ")


            //If there are no deals, the program terminates
            if (data.total == 0) {
                console.log("No new deals");
                process.exit();
            }

            for (var i = 0; i < data.total; i++) {

                var dealName = data.results[i].properties.dealname.value;
                var dealStage = data.results[i].properties.dealstage.value;
                
                //#4: Deal ID
                var dealID = data.results[i].dealId;
                console.log("The Deal ID is: " + dealID);
                console.log("DealStage: " + dealStage);

                //For the Pipelines

                var pipeline;

               if(dealStage=="" || dealStage =="" ||dealStage =="" || dealStage =="" || dealStage ==""  || dealStage =="" || dealStage =="" || dealStage ==""){
                  pipeline="Staff Aug"
              }
              
              if(dealStage=="" || dealStage =="" ||dealStage =="" || dealStage =="" || dealStage ==""  || dealStage =="" || dealStage =="" || dealStage ==""){
                  pipeline="Direct Hires"
              }
              //Getting Today's Date:
              let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
                var channeldescription;
                channeldescription= dealID+"/"+month+"-"+date+"-"+year;

                console.log("Pipeline: "+pipeline);
               
                    

                    if (pipeline == "" || pipeline == "") {
                        
                        graph.setup({
                            graph: {
                                fetchClientFactory: () => {
                                    return new AdalFetchClient("",
                                        "",
                                        "");
                                },
                            },
                        });
                        
                       
                        Teams();
                                                async function Teams() {
                                                  
                                                    const newChannel = await graph.teams.getById('').channels.create(dealName, channeldescription);
                                                    console.log(newChannel);
                                                }
                        
                    }


                
            }













        })
};











