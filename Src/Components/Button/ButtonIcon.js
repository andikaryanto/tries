import React, { memo } from 'react'
import { Button, Icon } from 'native-base';
const ButtonIcon = memo(({style, children, ...props}) => {
        let styles = {
            // borderRadius:25,
            ...style
        }

        return  <Button {...props} rounded style={styles}>
            {children}
        </Button>
})

export default ButtonIcon;