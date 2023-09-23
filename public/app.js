function vote(camp) {
    fetch('/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ camp })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.getElementById('results').innerText = `Camp 1: ${data.votes.camp1}, Camp 2: ${data.votes.camp2}`;
      } else {
        alert(data.message);
      }
    });
  }
  
  // 初始化投票结果
  fetch('/votes')
    .then(response => response.json())
    .then(data => {
      document.getElementById('results').innerText = `Camp 1: ${data.camp1}, Camp 2: ${data.camp2}`;
    });
  