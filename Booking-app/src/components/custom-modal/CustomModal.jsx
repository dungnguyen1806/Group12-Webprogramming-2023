import React from 'react'
import { Dialog, DialogActions, DialogContent } from '@mui/material'

export default function CustomModal({ open, content, actions }) {
    
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          padding: '10px',
        }
      }}
    >
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}