import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({ control,className = 'w-[80%]', name, label, defaultValue = "add your content here!" }) {
  return (
    <div className={className}>
      {label && <label>{label}</label>}

      <Controller
        name={name || 'RTE'}
        defaultValue={defaultValue}
        control={control}
        render={({ field }) => <>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API}
            value={field.value}
            onEditorChange={field.onChange}
            init={{
              // width: '100vw',
              menubar: true,
              branding: false,
            }}
          >

          </Editor>
        </>}
      >

      </Controller>
    </div>
  )
}

export default RTE