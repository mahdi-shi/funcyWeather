
export const Input = ({location,onChange}) => {
    return (
        <input placeholder="search location..." className="input" value={location} onChange={(e) => onChange(e.target.value)}/>
    )    
}
