import toast from 'react-hot-toast';

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const notify = (type, title) => {
    type === "e"
    ?
      toast.error(title, {
        duration: 7000,
        position: 'top-center',
        style: {
          border: 2,
          borderColor: "#f0f0f0",
          background: '#1C1C1E',
          color: "#f0f0f0",
        },
        className: '',
        iconTheme: {
          primary: '#FF453A',
          secondary: '#f0f0f0'
        },
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      })
    :
      toast.success(title, {
        duration: 7000,
        position: 'top-center',
        style: {
          border: 2,
          borderColor: "#f0f0f0",
          background: '#1C1C1E',
          color: "#f0f0f0",
        },
        className: '',
        iconTheme: {
          primary: '#5E5CE6',
          secondary: '#f0f0f0'
        },
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      })
  }