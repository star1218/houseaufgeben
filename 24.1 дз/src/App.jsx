import './App.css'

function App() {
    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">SWAPI</h1>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title mb-3">Star Wars API</h5>

                    <div className="input-group mb-4">
                        <span className="input-group-text">
                            https://swapi.dev/api/
                        </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="people/1/"
                        />

                        <button className="btn btn-primary">
                            Get info
                        </button>
                    </div>

                    <div className="result">
                        <h5>Result:</h5>

                        <pre>
{`{
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "gender": "male"
}`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App