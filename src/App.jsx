import React, { useEffect, useState } from 'react'
import './App.css'; // Import your CSS file for styling

const App = () => {
	const [divs, setDivs] = useState([
		{ id: 1, x: 0, y: 0, dx: 1, dy: 1 },
		{ id: 2, x: 800, y: 800, dx: 1.5, dy: 5.5 },
		{ id: 3, x: 200, y: 200, dx: 0.5, dy: 1.5 },
	])
	const [score, setScore] = useState(0)
	const [gameOver, setGameOver] = useState(false) // Track game over state
	const screenWidth = window.innerWidth
	const screenHeight = window.innerHeight
	const divSize = 100 // Adjust the size of the moving div

	useEffect(() => {
		const interval = setInterval(() => {
			// Move the divs continuously by updating their positions
			setDivs(prevDivs =>
				prevDivs.map(div => {
					let newX = div.x - div.dx
					let newY = div.y - div.dy

					// Reverse direction if div reaches the edge of the screen
					if (newX >= screenWidth - divSize || newX <= 0) {
						newX = newX >= screenWidth - divSize ? screenWidth - divSize : 0
						div.dx *= -1 // Reverse direction on collision with edges
					}
					if (newY >= screenHeight - divSize || newY <= 0) {
						newY = newY >= screenHeight - divSize ? screenHeight - divSize : 0
						div.dy *= -1 // Reverse direction on collision with edges
					}

					return { ...div, x: newX, y: newY }
				})
			)
		}, 10) // Adjust the interval duration as needed for smoother or faster movement

		return () => clearInterval(interval) // Clean up the interval on component unmount
	}, [screenWidth, screenHeight, divSize])

	const handleCatch = id => {
		setScore(score + 1)
		setDivs(prevDivs => {
			const updatedDivs = prevDivs.filter(div => div.id !== id)
			if (updatedDivs.length === 0) {
				setGameOver(true) // Set game over when no divs left
			}
			return updatedDivs
		})
	}

	return (
		<div className='game-container'>
			{divs.map(div => (
				<div
					key={div.id}
					className='catch-div'
					style={{ left: div.x, top: div.y }}
					onClick={() => handleCatch(div.id)}
				></div>
			))}
			{gameOver && (
				<div className='game-over'>
					<h1>Your Score: {score}</h1>
				</div>
			)}
			{!gameOver && <div className='score'>Score: {score}</div>}
		</div>
	)
}

export default App
