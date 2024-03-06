const alertGameOver = () => {
    Swal.fire({
        title: 'Game Over!',
        text: `You lost, your score was ${score}`,
        icon: 'error',
        confirmButtonText: 'Try Again',
        allowOutsideClick: true
    }).then((isConfirmed) => {
        /* Read more about isConfirmed, isDenied below */
        if (isConfirmed) location.reload()
    });

}