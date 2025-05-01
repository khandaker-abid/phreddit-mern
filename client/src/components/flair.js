export function LinkFlair({id, flairs}) {

    for(const f in flairs) {
        if(flairs[f].linkFlairID===id) {
            return <h4>{flairs[f].content}</h4>
        }
    }
    return '';
}