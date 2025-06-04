function mostrarEtapa(etapa) {
    document.querySelectorAll('.etapa').forEach(e => e.style.display = 'none');
    document.getElementById(etapa).style.display = 'block';
    window.scrollTo(0, 0);

    // Atualizar indicador de progresso
    const etapas = ['etapa1', 'etapa2', 'etapa3', 'etapa4'];
    const index = etapas.indexOf(etapa);
    const progresso = (index / (etapas.length - 1)) * 100;
    document.getElementById('progresso').style.width = `${progresso}%`;
}

let infos_email
async function Fazer_Login() {
    try {
        Logout()
        const result = await auth.signInWithPopup(provider)
        infos_email = result.user

        // Verifica se o usuário já existe
        const userDoc = await db.collection('users')
            .where('email', '==', infos_email.email)
            .limit(1)
            .get()

        if (userDoc.empty) {
            mostrarEtapa('etapa2')
        } else {
            window.location.href = 'index.html'
        }

    } catch (error) {
        console.error('Erro no login:', error)

        showErrorNotification(errorMessage)
    }
}

async function Logout() {
    try {
        await auth.signOut()
    } catch (error) {
        console.error('Erro ao fazer logout:', error)
    }
}

function coletarDadosUsuario() {
    const nome = document.getElementById('nome').value
    const sobrenome = document.getElementById('sobrenome').value
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '')
    const nascimento = document.getElementById('nascimento').value
    const telefone = document.getElementById('telefone').value.replace(/\D/g, '')

    const cep = document.getElementById('cep').value.replace(/\D/g, '')
    const logradouro = document.getElementById('logradouro').value
    const bairro = document.getElementById('bairro').value
    const cidade = document.getElementById('cidade').value
    const estado = document.getElementById('estado').value

    const nomeCartao = document.getElementById('nomeCartao').value
    const numeroCartao = document.getElementById('numeroCartao').value.replace(/\D/g, '')
    const validadeCartao = document.getElementById('validade').value
    const cvvCartao = document.getElementById('cvv').value

    const usuario = {
        dadosPessoais: {
            nomeCompleto: `${nome} ${sobrenome}`,
            nome,
            sobrenome,
            cpf,
            dataNascimento: nascimento,
            telefone,
            dataCadastro: new Date().toISOString()
        },
        endereco: {
            cep,
            logradouro,
            bairro,
            cidade,
            estado,
            completo: `${logradouro}, ${bairro}, ${cidade} - ${estado}, ${cep}`
        },
        agendamentos: [],
        pagamento: {
            cartoes: [{
                nomeTitular: nomeCartao,
                ultimosQuatroDigitos: numeroCartao.slice(-4),
                bandeira: document.getElementById('bandeiraIcone').textContent.replace(/^\w+\s/, ''),
                validade: validadeCartao
            }]
        },
        preferencias: {
            receberNotificacoes: true,
            receberOfertas: true
        },
        metadata: {
            cadastroCompleto: true,
            ultimaAtualizacao: new Date().toISOString()
        },
        id: db.collection('users').doc().id,
        email: infos_email.email
    }

    return usuario
}

async function enviarParaFirebase() {
    const usuario = coletarDadosUsuario()
    db.collection('users').doc(usuario.id).set(usuario).then(() => {
        window.location.href = 'index.html'
    })
}

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault()
    enviarParaFirebase()
})