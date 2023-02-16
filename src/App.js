import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [block, setBlock] = useState([]);
	const [repeatBlock, setRepeatBlock] = useState([]);

	useEffect(() => {
		let n = 0;
		let id = 0;
		let newArr = [];

		for (let i = 1; i < 9; i++) {
			n++;
			for (let j = 1; j < 9; j++) {
				id = id + 1;
				if (n % 2 === 0) {
					newArr.push({ color: 'black', id: id });
				} else {
					newArr.push({ color: 'white', id: id });
				}
				n++;
			}
		}

		setBlock(newArr);
		setRepeatBlock(newArr);
	}, []);

	const handleClick = (item) => {
		if (item.color === 'white' || item.color === 'red') {
			const clickedId = item.id;

			const clickedRow = ~~((clickedId - 1) / 8);
			const clickedCol = (clickedId - 1) % 8;

			const diagonalBlock = repeatBlock.filter((box) => {
				const row = ~~((box.id - 1) / 8);
				const col = (box.id - 1) % 8;
				return Math.abs(row - clickedRow) === Math.abs(col - clickedCol);
			});

			const newBlocks = repeatBlock.map((box) => {
				if (diagonalBlock.includes(box)) {
					return { color: 'red', id: box.id };
				}
				return box;
			});

			setBlock(newBlocks);
		}
	};

	return (
		<div className="main">
			<div className="boxes">
				{block?.map((item) => (
					<div key={item.id} onClick={() => handleClick(item)} style={{ background: item.color }} className="box"></div>
				))}
			</div>
		</div>
	);
}

export default App;
