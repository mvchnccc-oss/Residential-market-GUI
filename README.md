1. App starts
   └─ layout.tsx renders
       └─ AppProvider initializes:
           properties = useState(mockProperties)  
           representatives = useState(mockReps)   
           clients = useState(mockClients)        
           tours = useState(mockTours)            
           agreements = useState(mockAgreements)  
       └─ ToastProvider initializes:
           toasts = useState([])                   

2. User navigates to /properties
   └─ Next.js renders app/properties/page.tsx
   └─ Component calls useApp()
       └─ Gets: properties[], representatives[], addProperty, updateProperty, deleteProperty

3. User types in the search box
   └─ Local useState: search = "villa"
   └─ filteredProperties re-computes (no Context update needed — pure filter)
   └─ Table re-renders with filtered results

4. User clicks "Add Property" → fills form → clicks "Add"
   └─ handleSubmit calls addProperty(formData)
   └─ AppContext: setProperties([...properties, { id: 6, ...formData }])
   └─ React re-renders ALL components using properties[]
       - The table on this page updates
       - The Dashboard stat "Total Properties" would update too (if open)
   └─ addToast('Property added successfully!', 'success')
   └─ ToastContext: appends toast → green notification appears top-right → disappears after 3s

5. User navigates to /tours
   └─ useApp() gives them the SAME properties[] array (now with 6 items)
   └─ The new property appears in the property dropdown immediately