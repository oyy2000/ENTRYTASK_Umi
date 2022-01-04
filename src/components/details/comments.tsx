import { Tag } from 'antd-mobile'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { Avatar, ListItemAvatar, List, CardContent } from '@mui/material'

export default function comment({ comments }) {
  return (
    <>
      {comments[0].user ? (
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper'
          }}
        >
          {comments.map((comment) => {
            return (
              <ListItem alignItems="flex-start" key={comment.id}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={comment.user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{ color: '#8560A9', fontSize: '1.1rem' }}
                    >
                      {comment.user.username}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {comment.comment}
                    </Typography>
                  }
                ></ListItemText>
              </ListItem>
            )
          })}
        </List>
      ) : (
        'loading'
      )}
    </>
  )
}
