var octoturtle = require("./octoturtle.js");
var actions = octoturtle.actions;
var conditions = octoturtle.conditions;

var hook = octoturtle.WhenAn("issue").is("opened").to("Accelerator")
    .by("AndrewGuenther");

hook.do(conditions.when(), actions.addLabel());

function bodyContainsDibs(event, payload) {

}

hook.do(actions.applyLabel('dibs')).when(bodyContainsDibs);
