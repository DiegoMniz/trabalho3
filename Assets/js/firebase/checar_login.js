let user = null
auth.onAuthStateChanged((val) => {
    if (val && val.emailVerified) {
        Pegar_Infos_User(val.email).then(User_Info => {

            user = User_Info;

            try {
                if (!user) {
                    document.getElementById('btn_cadastrar').style.display = 'block'
                } else {
                    document.getElementById('btn_cadastrar').style.display = 'none'
                }   
            } catch{}

            try {
                renderizarAgendamentos()
            } catch{}
        })
    } else if (!location.href.includes('cadastro.html')) {
        location.href = 'cadastro.html'
    }
})

async function Pegar_Infos_User(Email) {
    try {
        const snapshot = await db.collection('users').get()
        let userFound = null;

        snapshot.forEach(user => {
            if (user.data().email === Email) {
                userFound = user.data()
            }
        })

        return userFound || false
    } catch (error) {
        console.error("Erro ao buscar usuário:", error)
        return false
    }
}