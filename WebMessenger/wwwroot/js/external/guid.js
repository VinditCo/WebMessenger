// from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript?page=2&tab=votes
/**
 * @return {string}
 */
function NewGuid()
{
    var sGuid="";
    for (var i=0; i<32; i++)
    {
        sGuid+=Math.floor(Math.random()*0xF).toString(0xF);
    }
    return sGuid;
}