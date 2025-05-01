export function findHyperlink(description,setDescError) {
    let text = ""
    let hyperlinked = ""
    let start = 0
    let end = start
    let first_instance = 0
    for(end = start; end<description.length-1; end++) {
        if(description[end] === ']' && description[end+1] === '(') {
            for(start=end; start>=0; start--) { 
                if(description[start]==='[') {
                    if(start===end-1) {
                        setDescError("[] cannot be empty")
                        return null;
                    } else {
                        text = description.substring(start+1, end);
                        first_instance = start
                        break
                    }
                }
            }
            start=end+1
            for(end=start; end<description.length; end++) {
                if(description[end] === ')') {
                    let link = description.substring(start+1, end)
                    if(link.substring(0,8)==="https://" || link.substring(0,7)==="http://") {
                        let x = ""
                        if(!(end===description.length-1)) {
                            x = description.substring(end+1,description.length)
                        }
                        hyperlinked = (description.substring(0,first_instance) + `<a href=${link} target="_blank">${text}</a>` + x)
                        return (findHyperlink(hyperlinked))
                    } else {
                        setDescError("Link must start with https:// or http://")
                        return null;
                    }
                }
            }
        }
    }
    return description
}