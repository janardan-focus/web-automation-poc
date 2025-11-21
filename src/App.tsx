// src/App.js
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";


interface FormValues {
    fullName: string;
    email: string;
    experience: "junior" | "mid" | "senior";
    framework?: "react" | "vue";
    terms?: boolean;
    secretCode?: string;
    resume?: FileList | null;
}

function ShadowWrapper() {
    const rootRef = useRef(null);

    useEffect(() => {
        if (rootRef.current && !(rootRef.current as any).shadowRoot) {
            const shadow = (rootRef.current as any).attachShadow({ mode: 'open' });

            const shadowButton = document.createElement('button');
            shadowButton.textContent = 'Shadow Button';
            shadowButton.setAttribute('data-testid', 'shadow-button');
            shadowButton.onclick = () => alert('Shadow Button Clicked!');

            shadow.appendChild(shadowButton);
        }
    }, []);

    return <div ref={rootRef} data-testid="shadow-host"></div>;

}

function App() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [submittedData, setSubmittedData] = useState(null);
    const [showAdditional, setShowAdditional] = useState(false);

    const onSubmit = (data: FormValues): void => {
        // Ensure setSubmittedData accepts the typed data
        const typedSetSubmittedData = setSubmittedData as React.Dispatch<React.SetStateAction<FormValues | null>>;
        typedSetSubmittedData(data);
    };

    const handleDelayedAction = () => {
        setTimeout(() => {
            setShowAdditional(true);
        }, 2000); // 2 second delay to test "waitFor" capabilities
    };
    
    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h1>Automation Testing Playground</h1>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                {/* 1. Text Input */}
                <label>Full Name:</label>
                <input
                    data-testid="input-name"
                    {...register("fullName", { required: true })}
                    placeholder="John Doe"
                />
                {errors.fullName && <span style={{ color: "red" }}>Name is required</span>}

                {/* 2. Email Input */}
                <label>Email:</label>
                <input
                    type="email"
                    data-testid="input-email"
                    {...register("email", { required: true })}
                />

                {/* 3. Select Dropdown */}
                <label>Experience Level:</label>
                <select data-testid="select-experience" {...register("experience")}>
                    <option value="junior">Junior</option>
                    <option value="mid">Mid-Level</option>
                    <option value="senior">Senior</option>
                </select>

                {/* 4. Radio Buttons */}
                <label>Preferred Framework:</label>
                <div>
                    <label>
                        <input type="radio" value="react" data-testid="radio-react" {...register("framework")} /> React
                    </label>
                    <label>
                        <input type="radio" value="vue" data-testid="radio-vue" {...register("framework")} /> Vue
                    </label>
                </div>

                {/* 5. Checkbox */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <input type="checkbox" data-testid="checkbox-terms" {...register("terms")} />
                    <label>I accept terms and conditions</label>
                </div>

                {/* 6. Dynamic Content (Wait Test) */}
                <div style={{ border: "1px dashed grey", padding: "10px" }}>
                    <p>Test Explicit Waits:</p>
                    <button type="button" data-testid="btn-reveal" onClick={handleDelayedAction}>
                        Reveal Secret Field (2s delay)
                    </button>
                    {showAdditional && (
                        <input
                            style={{ marginTop: "10px", display: "block" }}
                            data-testid="input-secret"
                            placeholder="Secret Code"
                            {...register("secretCode")}
                        />
                    )}
                </div>

                {/* 7. File Upload */}
                <label>Upload Resume:</label>
                <input type="file" data-testid="input-file" {...register("resume")} />


                {/* 8. Shadow DOM */}
                <div style={{ marginTop: "20px" }}>
                   <h3>Shadow DOM</h3>
                   <ShadowWrapper />
                </div>

                {/* 9. IFrame */}
                <div style={{ marginTop: "20px" }}>
                   <h3>IFrame</h3>
                   <iframe
                       data-testid="iframe-host"
                       title="Test IFrame"
                       style={{ width: "100%", height: "150px", border: "1px solid black" }}
                       srcDoc={`
                           <!DOCTYPE html>
                           <html lang="en">
                           <head>
                               <meta charset="UTF-8" />
                               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                               <title>Iframe Content</title>
                           </head>
                           <body>
                               <button data-testid="iframe-btn" style="padding: 10px; margin-top: 20px;" onclick="document.querySelector(&quot;[data-testid='iframe-text']&quot;).textContent=&quot;Clicked!&quot;">Click</button>
                               <span data-testid="iframe-text" style="display: block; margin-top: 20px;"></span>
                           </body>
                           </html>
                       `}
                   />
                </div>

                {/* Submit Button */}
                <button type="submit" data-testid="btn-submit" style={{ marginTop: "20px", padding: "10px" }}>
                    Submit Form
                </button>
            </form>

            {/* Result Display */}
            {submittedData && (
                <div data-testid="result-area" style={{ marginTop: "20px", background: "#e0f7fa", padding: "10px" }}>
                    <h3>Submission Successful</h3>
                    <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;