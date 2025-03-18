export default function Photo(){
    const handleFile = (event) => {
        const file = event.target.files[0];
        if (file) {
          console.log("Selected file:", file);
    
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              console.log("Base64 string:", reader.result); // Debugging
            //   setFormData({...formData,profilePicture:reader.result})
            } else {
              console.error("FileReader result is empty");
            }
          };
    
          reader.onerror = (error) => {
            console.error("Error reading file:", error);
          };
    
          reader.readAsDataURL(file);
        } else {
          console.warn("No file selected");
        }
      };

      return(
        <input type="file" name="profilePicture" onChange={(event)=>handleFile(event)} />
      )
}