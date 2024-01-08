import '../styles/integrations.scss'

const Integrations = () => {
  return (
    <div className="page integrations">
        <h1>INTEGRATIONS</h1>
        <div className="container">
            <div className="box">
                <div>
                <h2>npm</h2>
                <button>copy</button>
                </div>
                <div>
                    <span>npm install</span>
                    <span>import xyz from 'sayhi'</span>
                    {
                        `<script>
                        xyz(siteid)
                        </script>`
                    }
                </div>
            </div>
            <div className="box">
                <h2>react</h2>
            </div>
            <div className="box">
                <h2>vue</h2>
            </div>
        </div>
    </div>
  )
}

export default Integrations