import module from 'module'
import React from 'react'
import { useHistory} from 'react-router-dom'
import { Anchor } from './styles'
function A(props: any) {
    const  History = useHistory()
    function handleWithRedirect(route: string,module : string) {
        History.push(`/${module}/${route}`)
    }

    Anchor.defaultProps = {
        color: props.color
    }
    
    return <Anchor onClick={() =>handleWithRedirect(props.url,props.module)}>{props.children}</Anchor>
}
export default A